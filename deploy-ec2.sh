#!/bin/bash

# EC2 Deployment Script for Vacation/Stats Website
# Usage: ./deploy-ec2.sh

set -e

echo "🚀 Starting EC2 deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo yum update -y

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    sudo yum install -y docker
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -a -G docker ec2-user
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo "🔧 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Install Git if not present
if ! command -v git &> /dev/null; then
    echo "📂 Installing Git..."
    sudo yum install -y git
fi

# Clone the repository
echo "📥 Cloning repository..."
if [ -d "ThirdProject" ]; then
    cd ThirdProject
    git pull origin main
else
    git clone https://github.com/GeorgeMagnuss/ThirdProject.git
    cd ThirdProject
fi

# Create environment file
echo "⚙️  Creating environment configuration..."
cat > .env << EOF
EC2_HOST=13.60.242.34
DOMAIN_NAME=13.60.242.34
DEBUG=0
DB_HOST=database
DB_NAME=vacations_db
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432
EOF

# Build and start services
echo "🔨 Building and starting services..."
sudo docker-compose down || true
sudo docker-compose build
sudo docker-compose up -d

echo "✅ Deployment complete!"
echo "🌐 Your application should be available at:"
echo "   Frontend: http://13.60.242.34"
echo "   Backend API: http://13.60.242.34:8000"
echo ""
echo "📋 To check service status: sudo docker-compose ps"
echo "📋 To view logs: sudo docker-compose logs -f"