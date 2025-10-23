# Person 2: SSI Identity Management (Veramo)

This part manages **decentralized identities and verifiable credentials** using Veramo.

---

## **Goal**
- Create DIDs for University (issuer), Student (holder), Employer (verifier)
- Define a Verifiable Credential schema for degrees
- Issue and verify VCs
- Connect DIDs with blockchain hashes (from Person 1)

---

## **Tools & Dependencies**
- Node.js & npm  
- [Veramo Framework](https://veramo.io)  
- SQLite (local data storage)  
- JSON-LD / W3C VC standards  

---

## **1️⃣ Project Setup**

### **1.1 Create Project Folder**
```bash
mkdir ssi-identity
cd ssi-identity
npm init -y
