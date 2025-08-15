# Start-TestEnvironment.ps1
# PowerShell script to start both backend and frontend for testing

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "    LocalGOV Test Environment Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Define paths
$rootPath = "E:\MY\PROJECTS\WEB APP\Syntax-Spartans_LocalGOV"
$backendPath = Join-Path -Path $rootPath -ChildPath "backend"
$frontendPath = Join-Path -Path $rootPath -ChildPath "frontend"
$testGuidePath = Join-Path -Path $rootPath -ChildPath "AUTH_TESTING_GUIDE.md"

# Check if paths exist
if (-not (Test-Path -Path $backendPath)) {
    Write-Host "Backend directory not found at: $backendPath" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path -Path $frontendPath)) {
    Write-Host "Frontend directory not found at: $frontendPath" -ForegroundColor Red
    exit 1
}

# Check if the backend is running (on port 5000)
$backendRunning = $false
try {
    $connection = New-Object System.Net.Sockets.TcpClient("localhost", 5000)
    if ($connection.Connected) {
        $backendRunning = $true
        $connection.Close()
    }
} catch {
    $backendRunning = $false
}

# Start the backend if not running
if (-not $backendRunning) {
    Write-Host "Starting backend server..." -ForegroundColor Yellow
    
    # Start a new PowerShell window for the backend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Starting LocalGOV Backend...' -ForegroundColor Green; npm start"
    
    # Wait for backend to start
    Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
} else {
    Write-Host "Backend server is already running on port 5000" -ForegroundColor Green
}

# Check if we need to create a test user
Write-Host ""
Write-Host "Do you want to create a test user? (y/n)" -ForegroundColor Cyan
$createUser = Read-Host
if ($createUser -eq "y") {
    Write-Host "Creating test user..." -ForegroundColor Yellow
    # Start a new PowerShell window for creating the test user
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Creating Test User...' -ForegroundColor Green; node create-test-user.js"
}

# Start the frontend
Write-Host ""
Write-Host "Starting frontend development server..." -ForegroundColor Yellow
# Start a new PowerShell window for the frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Starting LocalGOV Frontend...' -ForegroundColor Green; npm run dev"

# Open testing guide
Write-Host ""
Write-Host "Do you want to open the authentication testing guide? (y/n)" -ForegroundColor Cyan
$openGuide = Read-Host
if ($openGuide -eq "y") {
    # Open the testing guide in the default editor
    Start-Process $testGuidePath
}

# Open test page in browser
Write-Host ""
Write-Host "Do you want to open the test page in your browser? (y/n)" -ForegroundColor Cyan
$openTest = Read-Host
if ($openTest -eq "y") {
    Start-Process "http://localhost:3000/test"
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  LocalGOV Test Environment is Ready!" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test URLs:" -ForegroundColor Green
Write-Host "- Test Page: http://localhost:3000/test" -ForegroundColor White
Write-Host "- Login Page: http://localhost:3000/auth/login" -ForegroundColor White
Write-Host "- Dashboard: http://localhost:3000/dashboard" -ForegroundColor White
Write-Host "- Redirect Test: http://localhost:3000/citizen/dashboard" -ForegroundColor White
Write-Host ""
Write-Host "Test Login Credentials:" -ForegroundColor Green
Write-Host "- Email: test@example.com" -ForegroundColor White
Write-Host "- Password: password123" -ForegroundColor White
Write-Host ""
