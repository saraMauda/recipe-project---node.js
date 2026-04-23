# 🍳 Recipe Management System - Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
  <img src="https://img.shields.io/badge/JSON_Web_Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="jwt" />
</p>

---

## 📝 אודות הפרויקט
מערכת ניהול מתכונים מתקדמת המאפשרת למשתמשים לנהל את המתכונים שלהם בצורה מאובטחת. הפרויקט כולל מערכת הרשאות מלאה, חיפוש חכם וניהול נתונים מורכב הכולל שכבות (Layers) והוראות הכנה.

## 🚀 תכונות עיקריות (Key Features)
* **Authentication & Authorization:** הרשמה והתחברות מאובטחת באמצעות JWT ו-Bcrypt להצפנת סיסמאות.
* **Recipe CRUD:** ניהול מלא של מתכונים (יצירה, קריאה, עדכון ומחיקה).
* **Advanced Search:** מנגנון חיפוש לפי שם, קטגוריה וזמן הכנה מקסימלי.
* **Data Validation:** ולידציה קפדנית לכל נתון נכנס באמצעות ספריית Joi.
* **Global Error Handling:** ניהול שגיאות מרכזי המספק תגובות אחידות וברורות.
* **Private/Public:** אפשרות להגדרת מתכונים כפרטיים או ציבוריים.

---

## 🛠 טכנולוגיות
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JWT, Bcrypt
- **Validation:** Joi

---

## 📂 מבנה ה-API (Endpoints)

### משתמשים (Users)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users/register` | הרשמת משתמש חדש |
| `POST` | `/api/users/login` | התחברות וקבלת Token |

### מתכונים (Recipes)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/recipes` | שליפת כל המתכונים הציבוריים | ❌ |
| `GET` | `/api/recipes/:id` | שליפת מתכון ספציפי לפי ID | ❌ |
| `GET` | `/api/recipes/my-recipes` | שליפת המתכונים של המשתמש המחובר | ✅ |
| `POST` | `/api/recipes` | יצירת מתכון חדש | ✅ |
| `PUT` | `/api/recipes/:id` | עדכון מתכון קיים (לבעל המתכון בלבד) | ✅ |
| `DELETE` | `/api/recipes/:id` | מחיקת מתכון (לבעל המתכון בלבד) | ✅ |

---

## 💻 התקנה והרצה מקומית

1. בצעו Clone לפרויקט:
   ```bash
   git clone <your-repository-url>