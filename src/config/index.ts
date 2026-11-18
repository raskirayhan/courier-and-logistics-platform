import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  database_url:
    process.env.DATABASE_URL ||
    "postgresql://user:password@localhost:5432/dbname",
  app_url: process.env.APP_URL || "*",
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  jwt_access_secret:
    process.env.JWT_ACCESS_SECRET ||
    "courier_super_secret_access_token_jwt_2026_xyz",
  jwt_refresh_secret:
    process.env.JWT_REFRESH_SECRET ||
    "courier_super_secret_refresh_token_jwt_2026_xyz",
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  google_client_id: process.env.GOOGLE_CLIENT_ID || "demo-google-client-id",
  admin_name: process.env.ADMIN_NAME || "Super Admin",
  admin_email: process.env.ADMIN_EMAIL || "admin@example.com",
  admin_password: process.env.ADMIN_PASSWORD || "AdminSecurePassword123!",
  redis_user: process.env.REDIS_USER || "default",
  redis_password: process.env.REDIS_PASSWORD || "",
  redis_host: process.env.REDIS_HOST || "",
  redis_port: process.env.REDIS_PORT || 6379,
  smtp_user: process.env.SMTP_USER || "demo",
  smtp_password: process.env.SMTP_PASSWORD || "demo",
  email_sender: process.env.EMAIL_SENDER || "no-reply@courierservice.com",
  stripe_secret_key:
    process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_startup",
  stripe_webhook_key: process.env.STRIPE_WEBHOOK_KEY || "whsec_demo",
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY || "demo",
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || "demo",
};
