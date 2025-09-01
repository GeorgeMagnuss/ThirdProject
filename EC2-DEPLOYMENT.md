# AWS EC2 Deployment Guide

## Security Group Configuration

Configure your EC2 Security Group with these inbound rules:

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| HTTP | TCP | 80 | 0.0.0.0/0 | Frontend access |
| Custom TCP | TCP | 8000 | 0.0.0.0/0 | Backend API |
| SSH | TCP | 22 | Your IP | SSH access |

## Deployment Steps

1. **SSH into your EC2 instance:**
   ```bash
   ssh -i your-key.pem ec2-user@13.60.242.34
   ```

2. **Upload and run the deployment script:**
   ```bash
   curl -O https://raw.githubusercontent.com/GeorgeMagnuss/ThirdProject/main/deploy-ec2.sh
   chmod +x deploy-ec2.sh
   ./deploy-ec2.sh
   ```

3. **Or manually deploy:**
   ```bash
   # Install dependencies
   sudo yum update -y
   sudo yum install -y docker git
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -a -G docker ec2-user
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   
   # Clone and deploy
   git clone https://github.com/GeorgeMagnuss/ThirdProject.git
   cd ThirdProject
   cp .env.ec2.template .env
   sudo docker-compose up -d
   ```

## Access Your Application

- **Frontend:** http://13.60.242.34
- **Backend API:** http://13.60.242.34:8000
- **Admin Panel:** http://13.60.242.34:8000/admin

## Troubleshooting

- Check service status: `sudo docker-compose ps`
- View logs: `sudo docker-compose logs -f`
- Restart services: `sudo docker-compose restart`