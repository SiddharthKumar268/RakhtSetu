# 🩸 RakhtSetu - Blood Donation Platform

**रक्त सेतु - The Bridge of Life**

A serverless cloud-based blood donation platform built on AWS that connects blood donors with those in urgent need. The platform enables real-time donor matching, blood stock tracking, and emergency alert notifications.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [AWS Services Used](#aws-services-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Deployment](#installation--deployment)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Cost Estimation](#cost-estimation)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**RakhtSetu** is a serverless, scalable blood donation management system that solves the critical problem of finding blood donors quickly during emergencies. The platform uses AWS cloud services to provide:

- **Real-time donor registration** and matching
- **Blood stock availability** tracking across hospitals
- **Emergency alert system** via SMS notifications
- **Serverless architecture** ensuring high availability and low cost

**Live URL:** `http://rakhtsetu.s3-website.eu-north-1.amazonaws.com`

---

## ✨ Features

### 1. **Donor Registration**
- Register as a blood donor with personal details
- Store donor information securely in DynamoDB
- Blood group categorization (A+, A-, B+, B-, AB+, AB-, O+, O-)

### 2. **Smart Donor Matching**
- Search for donors by blood group and city
- Real-time query execution
- Instant results with donor contact information

### 3. **Blood Stock Management**
- Track blood availability across hospitals
- Real-time inventory updates
- Check stock by blood group

### 4. **Emergency Alerts**
- Send SMS notifications to donors
- AWS SNS integration for reliable delivery
- Instant emergency broadcast capability

---

## 🏗️ Architecture

### **Serverless Architecture Diagram**

```
┌─────────────────┐
│   Web Browser   │
│  (Frontend UI)  │
└────────┬────────┘
         │
         │ HTTPS
         ▼
┌─────────────────┐
│   Amazon S3     │
│ Static Hosting  │
└────────┬────────┘
         │
         │ REST API
         ▼
┌─────────────────┐
│  API Gateway    │
│   (HTTP API)    │
└────────┬────────┘
         │
         │ Invoke
         ▼
┌─────────────────────────────────────┐
│         AWS Lambda Functions        │
├─────────────────────────────────────┤
│  • registerDonor                    │
│  • matchDonor                       │
│  • checkAvailability                │
│  • sendEmergencyAlert               │
└────────┬─────────────┬──────────────┘
         │             │
         ▼             ▼
┌─────────────┐  ┌──────────┐
│  DynamoDB   │  │ AWS SNS  │
│  (Database) │  │  (SMS)   │
└─────────────┘  └──────────┘
```

### **Request Flow**

1. **User** accesses the web application hosted on S3
2. **Frontend** makes API calls to API Gateway
3. **API Gateway** routes requests to appropriate Lambda functions
4. **Lambda** processes the request and interacts with DynamoDB/SNS
5. **Response** flows back through API Gateway to the frontend

---

## ☁️ AWS Services Used

### 1. **Amazon S3 (Simple Storage Service)**
- **Purpose:** Host static website (HTML, CSS, JavaScript)
- **Configuration:** 
  - Bucket: `rakhtsetu`
  - Region: `eu-north-1` (Stockholm)
  - Static website hosting enabled
  - Public read access for website files

### 2. **AWS Lambda**
- **Purpose:** Serverless compute for business logic
- **Runtime:** Node.js 16.x
- **Functions:**
  - `registerDonor` - Register new blood donors
  - `matchDonor` - Find matching donors by criteria
  - `checkAvailability` - Query blood stock inventory
  - `sendEmergencyAlert` - Send SMS alerts via SNS
- **Configuration:**
  - Memory: 128 MB
  - Timeout: 3 seconds
  - IAM Role: `RakhtSetuLambdaRole`

### 3. **Amazon API Gateway**
- **Purpose:** RESTful API for frontend-backend communication
- **Type:** HTTP API (simpler and cheaper than REST API)
- **API ID:** `j0l3z4p0nl`
- **Base URL:** `https://j0l3z4p0nl.execute-api.eu-north-1.amazonaws.com/prod`
- **CORS:** Enabled for cross-origin requests

### 4. **Amazon DynamoDB**
- **Purpose:** NoSQL database for storing donor and blood stock data
- **Tables:**
  - `Donors` - Donor information
  - `BloodStock` - Hospital blood inventory
  - `Requests` - Blood request records
- **Configuration:**
  - Read/Write Capacity: 5 units each (provisioned)
  - Region: `eu-north-1`

### 5. **Amazon SNS (Simple Notification Service)**
- **Purpose:** Send SMS alerts to donors during emergencies
- **Configuration:**
  - SMS enabled
  - Region: `eu-north-1`

### 6. **AWS IAM (Identity and Access Management)**
- **Purpose:** Manage permissions and access control
- **Role:** `RakhtSetuLambdaRole`
- **Policies Attached:**
  - `AWSLambdaBasicExecutionRole` - CloudWatch logging
  - `AmazonDynamoDBFullAccess` - Database operations
  - `AmazonSNSFullAccess` - SMS notifications

---

## 📁 Project Structure

```
RakhtSetu/
│
├── frontend/                      # Web application files
│   ├── index.html                # Landing page
│   ├── register.html             # Donor registration form
│   ├── dashboard.html            # Search donors & check stock
│   ├── style.css                 # Styling for all pages
│   └── app.js                    # (Optional) Shared JavaScript
│
├── backend/
│   └── lambdas/                  # Lambda function code
│       ├── registerDonor.js      # Register new donors
│       ├── matchDonor.js         # Search matching donors
│       ├── checkAvailability.js  # Check blood stock
│       └── sendEmergencyAlert.js # Send SMS alerts
│
├── dynamodb/
│   └── tableSchemas.md           # Database schema documentation
│
└── README.md                      # This file
```

---

## 🔧 Prerequisites

Before deploying this project, ensure you have:

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```
3. **Node.js** (v16.x or higher) installed locally
4. **PowerShell** or **Terminal** access

---

## 🚀 Installation & Deployment

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/yourusername/rakhtsetu.git
cd rakhtsetu
```

### **Step 2: Create DynamoDB Tables**

```bash
# Create Donors table
aws dynamodb create-table \
  --table-name Donors \
  --attribute-definitions AttributeName=donorId,AttributeType=S \
  --key-schema AttributeName=donorId,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --region eu-north-1

# Create BloodStock table
aws dynamodb create-table \
  --table-name BloodStock \
  --attribute-definitions AttributeName=hospitalName,AttributeType=S \
  --key-schema AttributeName=hospitalName,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --region eu-north-1

# Create Requests table
aws dynamodb create-table \
  --table-name Requests \
  --attribute-definitions AttributeName=requestId,AttributeType=S \
  --key-schema AttributeName=requestId,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --region eu-north-1
```

### **Step 3: Create IAM Role for Lambda**

1. Go to **IAM Console** → **Roles** → **Create Role**
2. Select **AWS Service** → **Lambda**
3. Attach these policies:
   - `AWSLambdaBasicExecutionRole`
   - `AmazonDynamoDBFullAccess`
   - `AmazonSNSFullAccess`
4. Name: `RakhtSetuLambdaRole`
5. Copy the Role ARN (e.g., `arn:aws:iam::679835925043:role/RakhtSetuLambdaRole`)

### **Step 4: Deploy Lambda Functions**

```bash
cd backend/lambdas

# Create ZIP files
Compress-Archive -Path registerDonor.js -DestinationPath registerDonor.zip -Force
Compress-Archive -Path checkAvailability.js -DestinationPath checkAvailability.zip -Force
Compress-Archive -Path matchDonor.js -DestinationPath matchDonor.zip -Force
Compress-Archive -Path sendEmergencyAlert.js -DestinationPath sendEmergencyAlert.zip -Force

# Deploy Lambda functions
aws lambda create-function \
  --function-name registerDonor \
  --runtime nodejs16.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/RakhtSetuLambdaRole \
  --handler registerDonor.handler \
  --zip-file fileb://registerDonor.zip \
  --region eu-north-1

aws lambda create-function \
  --function-name checkAvailability \
  --runtime nodejs16.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/RakhtSetuLambdaRole \
  --handler checkAvailability.handler \
  --zip-file fileb://checkAvailability.zip \
  --region eu-north-1

aws lambda create-function \
  --function-name matchDonor \
  --runtime nodejs16.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/RakhtSetuLambdaRole \
  --handler matchDonor.handler \
  --zip-file fileb://matchDonor.zip \
  --region eu-north-1

aws lambda create-function \
  --function-name sendEmergencyAlert \
  --runtime nodejs16.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/RakhtSetuLambdaRole \
  --handler sendEmergencyAlert.handler \
  --zip-file fileb://sendEmergencyAlert.zip \
  --region eu-north-1
```

### **Step 5: Create API Gateway**

1. Go to **API Gateway Console** → **Create API** → **HTTP API**
2. Name: `RakhtSetuAPI`
3. Add integrations:
   - `POST /registerDonor` → `registerDonor` Lambda
   - `POST /checkAvailability` → `checkAvailability` Lambda
   - `POST /matchDonor` → `matchDonor` Lambda
   - `POST /sendEmergencyAlert` → `sendEmergencyAlert` Lambda
4. Configure **CORS**:
   - Allow Origins: `*` (or your S3 URL)
   - Allow Methods: `GET, POST, OPTIONS`
   - Allow Headers: `Content-Type, X-Amz-Date, Authorization`
5. Create stage: `prod`
6. Copy the **Invoke URL**

### **Step 6: Deploy Frontend to S3**

```bash
cd ../../frontend

# Create S3 bucket
aws s3 mb s3://rakhtsetu --region eu-north-1

# Enable static website hosting
aws s3 website s3://rakhtsetu \
  --index-document index.html \
  --error-document index.html

# Upload files
aws s3 sync . s3://rakhtsetu --region eu-north-1

# Make bucket public (set bucket policy)
# Use AWS Console to add this policy:
```

**Bucket Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::rakhtsetu/*"
    }
  ]
}
```

### **Step 7: Update Frontend with API URL**

In `register.html` and `dashboard.html`, update:

```javascript
const API_BASE_URL = 'YOUR_API_GATEWAY_URL/prod';
```

Re-upload:
```bash
aws s3 sync . s3://rakhtsetu --region eu-north-1
```

---

## 🔌 API Endpoints

### Base URL
```
https://j0l3z4p0nl.execute-api.eu-north-1.amazonaws.com/prod
```

### 1. **Register Donor**
- **Endpoint:** `POST /registerDonor`
- **Description:** Register a new blood donor
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+46123456789",
    "bloodGroup": "A+",
    "city": "Stockholm"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Donor Registered"
  }
  ```

### 2. **Match Donor**
- **Endpoint:** `POST /matchDonor`
- **Description:** Find donors by blood group and city
- **Request Body:**
  ```json
  {
    "bloodGroup": "A+",
    "city": "Stockholm"
  }
  ```
- **Response:**
  ```json
  [
    {
      "donorId": "1698765432100",
      "name": "John Doe",
      "bloodGroup": "A+",
      "city": "Stockholm",
      "phone": "+46123456789"
    }
  ]
  ```

### 3. **Check Availability**
- **Endpoint:** `POST /checkAvailability`
- **Description:** Get blood stock from all hospitals
- **Request Body:**
  ```json
  {}
  ```
- **Response:**
  ```json
  [
    {
      "hospitalName": "Karolinska Hospital",
      "bloodGroup": "A+",
      "unitsAvailable": 25
    }
  ]
  ```

### 4. **Send Emergency Alert**
- **Endpoint:** `POST /sendEmergencyAlert`
- **Description:** Send SMS alert to donor
- **Request Body:**
  ```json
  {
    "phone": "+46123456789",
    "message": "Urgent: A+ blood needed at Karolinska Hospital"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Alert sent!"
  }
  ```

---

## 🗄️ Database Schema

### **Table: Donors**
| Attribute    | Type   | Description            |
|--------------|--------|------------------------|
| donorId (PK) | String | Unique donor ID        |
| name         | String | Donor's full name      |
| email        | String | Email address          |
| phone        | String | Phone number           |
| bloodGroup   | String | Blood type (A+, O-, etc.) |
| city         | String | Donor's city           |

### **Table: BloodStock**
| Attribute         | Type   | Description                |
|-------------------|--------|----------------------------|
| hospitalName (PK) | String | Hospital identifier        |
| bloodGroup        | String | Blood type                 |
| unitsAvailable    | Number | Number of units available  |

### **Table: Requests**
| Attribute     | Type   | Description              |
|---------------|--------|--------------------------|
| requestId (PK)| String | Unique request ID        |
| bloodGroup    | String | Required blood type      |
| urgency       | String | Priority level           |
| hospitalName  | String | Requesting hospital      |
| timestamp     | String | Request creation time    |

---

## 🧪 Testing

### **Test Lambda Functions**

Go to Lambda Console → Select function → Test

**Test Event for registerDonor:**
```json
{
  "body": "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"+46123456789\",\"bloodGroup\":\"O+\",\"city\":\"Stockholm\"}"
}
```

**Test Event for matchDonor:**
```json
{
  "body": "{\"bloodGroup\":\"O+\",\"city\":\"Stockholm\"}"
}
```

### **Test Frontend**

1. Visit: `http://rakhtsetu.s3-website.eu-north-1.amazonaws.com`
2. Register a donor
3. Search for the donor on dashboard
4. Check browser console (F12) for any errors

---

## 💰 Cost Estimation

### **Monthly Costs (Approximate)**

| Service         | Usage                  | Cost/Month |
|-----------------|------------------------|------------|
| S3              | 1 GB storage, 10K requests | $0.10  |
| Lambda          | 100K requests, 128 MB  | $0.20      |
| API Gateway     | 100K API calls         | $0.10      |
| DynamoDB        | 5 RCU/WCU, 1 GB data   | $3.00      |
| SNS             | 100 SMS messages       | $0.50      |
| **Total**       |                        | **~$4/month** |

**AWS Free Tier Benefits:**
- Lambda: 1M requests/month free
- DynamoDB: 25 GB storage free
- API Gateway: 1M requests free (first 12 months)
- S3: 5 GB storage free (first 12 months)

---

## 🚀 Future Enhancements

1. **User Authentication**
   - Add AWS Cognito for secure login
   - Donor/Admin role-based access

2. **Advanced Search**
   - Search by distance using geolocation
   - Filter by last donation date

3. **Notifications**
   - Email notifications via AWS SES
   - Push notifications via AWS SNS

4. **Analytics Dashboard**
   - Track donation statistics
   - Generate reports using AWS QuickSight

5. **Mobile App**
   - React Native or Flutter app
   - Use AWS Amplify for deployment

6. **AI Integration**
   - Predict blood demand using AWS SageMaker
   - Chatbot using Amazon Lex

---

## 👥 Contributors

- **Your Name** - Full Stack Developer & Cloud Architect

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

For questions or support:
- **Email:** your.email@example.com
- **GitHub:** github.com/yourusername
- **LinkedIn:** linkedin.com/in/yourprofile

---

## 🙏 Acknowledgments

- AWS Documentation and Tutorials
- Blood donation organizations for inspiration
- Open-source community

---

**🩸 RakhtSetu - Saving Lives, One Donation at a Time** 

*Built with ❤️ using AWS Serverless Technol


aws s3 sync . s3://rakhtsetu --region eu-north-1