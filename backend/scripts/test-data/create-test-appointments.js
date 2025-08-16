const MySQLAppointment = require('./models/MySQLAppointment');
const { initializeMySQLDatabase } = require('./config/database');

async function createTestAppointments() {
    try {
        await initializeMySQLDatabase();
        console.log('✅ MySQL Database initialized successfully.');

        // Free services as defined in the frontend
        const freeServices = [
            {
                serviceName: 'National ID Card Application',
                department: 'Department of Registration of Persons',
                location: 'District Secretariat Office',
                description: 'Application for new National Identity Card'
            },
            {
                serviceName: 'Passport Application',
                department: 'Department of Immigration and Emigration',
                location: 'Passport Office',
                description: 'Application for new passport'
            },
            {
                serviceName: 'Driving License Renewal',
                department: 'Department of Motor Traffic',
                location: 'Motor Traffic Office',
                description: 'Renewal of driving license'
            },
            {
                serviceName: 'Birth Certificate Request',
                department: 'District Registrar Office',
                location: 'Registrar General\'s Department',
                description: 'Request for certified birth certificate'
            },
            {
                serviceName: 'Marriage Certificate Request',
                department: 'District Registrar Office',
                location: 'Registrar General\'s Department',
                description: 'Request for certified marriage certificate'
            }
        ];

        const userId = 1; // The test user we just created
        const appointments = [];

        for (let i = 0; i < 3; i++) {
            const service = freeServices[i];
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + (i + 1) * 3); // 3, 6, 9 days from now

            const appointment = await MySQLAppointment.create({
                userId: userId,
                serviceName: service.serviceName,
                department: service.department,
                appointmentDate: futureDate,
                timeSlot: i === 0 ? '09:00-10:00' : i === 1 ? '14:00-15:00' : '11:00-12:00',
                status: i === 0 ? 'confirmed' : 'pending',
                location: service.location,
                description: service.description,
                queueNumber: i + 1,
                estimatedWaitTime: (i + 1) * 15,
                priority: 'normal',
                notes: `Test appointment ${i + 1}`
            });

            appointments.push(appointment);
            console.log(`✅ Created appointment ${i + 1}: ${service.serviceName}`);
        }

        console.log(`\n✅ Successfully created ${appointments.length} test appointments!`);
        console.log('🎯 You can now test the dashboard and My Appointments page.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating test appointments:', error);
        process.exit(1);
    }
}

createTestAppointments();
