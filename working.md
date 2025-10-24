http://rakhtsetu.s3-website.eu-north-1.amazonaws.com
```

### **Step 2: Test Donor Registration**

1. Click **"Register as Donor"**
2. Fill the form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+46123456789`
   - Blood Group: `A+`
   - City: `Stockholm`
3. Click **"Register"**
4. ✅ You should see: "Donor registered successfully!"

### **Step 3: Test Donor Search**

1. Go back and click **"Find Donors"**
2. Fill search form:
   - Blood Group: `A+`
   - City: `Stockholm`
3. Click **"Search Donors"**
4. ✅ You should see John Doe in the results!

### **Step 4: Test Blood Stock**

1. On Dashboard, click **"Check Availability"**
2. ✅ Should show empty list (no stock data yet)

---

## **Method 2: Verify Data in DynamoDB Console**

### **Check if Donor was Actually Saved**

1. Go to **AWS Console** → **DynamoDB**
2. Click **Tables** → **Donors**
3. Click **"Explore table items"**
4. ✅ You should see your registered donor!

**What you'll see:**
```
donorId: "1698765432100"
name: "John Doe"
email: "john@example.com"
phone: "+46123456789"
bloodGroup: "A+"
city: "Stockholm"