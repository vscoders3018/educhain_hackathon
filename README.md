# Medata.Network

## The problem Medata.network solves
Our platform allows patients to securely submit their medical reports, protecting their sensitive information from leaks. Unlike existing systems that often expose private data, our solution stores reports on a secure blockchain, ensuring privacy. Additionally, companies can purchase anonymized data in bulk for research and AI training, guaranteeing confidentiality and safety while leveraging valuable insights for innovation.

## Challenges we ran into
Distributing Tokens to a Large Number of People: Managing token distribution at scale was a challenge, as handling transactions for a large user base can be resource-intensive. We overcame this by implementing batch processing and optimizing smart contracts to reduce transaction costs and improve efficiency.

Generating Required Format Data from Reports: Extracting and converting medical reports into a consistent, structured format for blockchain storage was difficult due to varied report formats. To solve this, we developed custom parsers that could automatically detect and convert different report structures into the required format, ensuring data consistency and accuracy.

## Setup 
Frontend Env
```
VITE_BACKEND_URL = 'http://localhost:4000'
```

Backend Env
```
JWT_SECRET=""

ADMIN_NUMBER = ""
ADMIN_PASSWORD = ""

MONGODB_URI = "your_db_url"

CLOUDINARY_NAME = ""
CLOUDINARY_API_KEY = ""
CLOUDINARY_SECRET_KEY = ""

GEMINI_API_KEY='paste gemini-api'
```

Admin Env
```
VITE_BACKEND_URL = 'http://localhost:4000'
```

Run Commands
```
npm run a  (Static Backend)

OR

npm run b  (Dyanamic Bancked)
```
