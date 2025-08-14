const fastify = require('fastify')({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
    transport: process.env.NODE_ENV !== 'production' ? {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    } : undefined,
  },
})

// Register plugins
async function build() {
  // Environment variables
  await fastify.register(require('@fastify/env'), {
    schema: {
      type: 'object',
      required: ['PORT', 'DATABASE_URL', 'JWT_SECRET'],
      properties: {
        PORT: { type: 'string', default: '3000' },
        NODE_ENV: { type: 'string', default: 'development' },
        DATABASE_URL: { type: 'string' },
        REDIS_URL: { type: 'string' },
        JWT_SECRET: { type: 'string' },
        JWT_EXPIRES_IN: { type: 'string', default: '24h' },
      },
    },
  })

  // Security plugins
  await fastify.register(require('@fastify/helmet'), {
    contentSecurityPolicy: false,
  })

  await fastify.register(require('@fastify/cors'), {
    origin: true,
    credentials: true,
  })

  await fastify.register(require('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
  })

  // JWT plugin
  await fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET,
    sign: {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  })

  // Database connection
  const { Pool } = require('pg')
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  fastify.decorate('db', pool)

  // Redis connection (if available)
  if (process.env.REDIS_URL) {
    const redis = require('redis')
    const client = redis.createClient({
      url: process.env.REDIS_URL,
    })
    
    await client.connect()
    fastify.decorate('redis', client)
  }

  // Routes
  await fastify.register(require('./routes/auth'), { prefix: '/auth' })
  await fastify.register(require('./routes/users'), { prefix: '/users' })
  await fastify.register(require('./routes/roles'), { prefix: '/roles' })

  // Health check
  fastify.get('/health', async (request, reply) => {
    return { status: 'ok', service: 'iam-service', timestamp: new Date().toISOString() }
  })

  return fastify
}

// Start server
async function start() {
  try {
    const app = await build()
    
    await app.listen({
      port: parseInt(process.env.PORT || '3000'),
      host: '0.0.0.0',
    })
    
    app.log.info('IAM Service started successfully')
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
}

if (require.main === module) {
  start()
}

module.exports = { build }
