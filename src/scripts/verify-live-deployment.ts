const LIVE_URL = "https://industry-standard-project-raskirayhans-projects.vercel.app";

async function verifyLive() {
  console.log(`🌐 Verifying Live Vercel Deployment at: ${LIVE_URL}\n`);

  // 1. Root Route
  console.log("1. Checking Root URL (GET /)...");
  const rootRes = await fetch(`${LIVE_URL}/`);
  const rootJson = await rootRes.json();
  console.log(`   Status: ${rootRes.status}`, rootJson);
  if (rootRes.status !== 200 || !rootJson.success) throw new Error("Root check failed");

  // 2. Health Route
  console.log("\n2. Checking Health Check (GET /api/v1/health)...");
  const healthRes = await fetch(`${LIVE_URL}/api/v1/health`);
  const healthJson = await healthRes.json();
  console.log(`   Status: ${healthRes.status}`, healthJson);
  if (healthRes.status !== 200 || !healthJson.success) throw new Error("Health check failed");

  // 3. Hubs Route (Neon Database connection)
  console.log("\n3. Checking Hubs List from Neon DB (GET /api/v1/hubs)...");
  const hubsRes = await fetch(`${LIVE_URL}/api/v1/hubs`);
  const hubsJson = await hubsRes.json();
  console.log(`   Status: ${hubsRes.status}`);
  console.log(`   Total Hubs Found: ${hubsJson.meta?.total || hubsJson.data?.length}`);
  if (hubsRes.status !== 200 || !hubsJson.success) throw new Error("Hubs DB check failed");

  // 4. Admin Login
  console.log("\n4. Logging in as Admin (admin@example.com)...");
  const adminLoginRes = await fetch(`${LIVE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@example.com", password: "AdminSecurePassword123!" }),
  });
  const adminLoginJson = await adminLoginRes.json();
  console.log(`   Status: ${adminLoginRes.status}`, {
    success: adminLoginJson.success,
    hasAccessToken: !!adminLoginJson.data?.accessToken,
  });
  if (adminLoginRes.status !== 200) throw new Error("Admin login failed");
  const adminToken = adminLoginJson.data.accessToken;

  // 5. Customer Login
  console.log("\n5. Logging in as Customer (customer@demo.com)...");
  const customerLoginRes = await fetch(`${LIVE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "customer@demo.com", password: "Password@123!" }),
  });
  const customerLoginJson = await customerLoginRes.json();
  console.log(`   Status: ${customerLoginRes.status}`, {
    success: customerLoginJson.success,
    hasAccessToken: !!customerLoginJson.data?.accessToken,
  });
  if (customerLoginRes.status !== 200) throw new Error("Customer login failed");
  const customerToken = customerLoginJson.data.accessToken;

  // 6. Courier Login
  console.log("\n6. Logging in as Courier (courier@demo.com)...");
  const courierLoginRes = await fetch(`${LIVE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "courier@demo.com", password: "Password@123!" }),
  });
  const courierLoginJson = await courierLoginRes.json();
  console.log(`   Status: ${courierLoginRes.status}`, {
    success: courierLoginJson.success,
    hasAccessToken: !!courierLoginJson.data?.accessToken,
  });
  if (courierLoginRes.status !== 200) throw new Error("Courier login failed");

  // 7. Role-Based Access Control (RBAC): Customer trying to access Admin route (POST /api/v1/hubs)
  console.log("\n7. Testing RBAC: Customer attempting to create a Hub (POST /api/v1/hubs)...");
  const rbacRes = await fetch(`${LIVE_URL}/api/v1/hubs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${customerToken}`,
    },
    body: JSON.stringify({
      name: "Unauthorized Hub",
      address: "Some Street",
      zone: "Dhaka",
      contactNo: "01711000000",
    }),
  });
  const rbacJson = await rbacRes.json();
  console.log(`   Status: ${rbacRes.status} (Expected 403 Forbidden)`);
  console.log("   Response Body:", rbacJson);
  if (rbacRes.status !== 403 || rbacJson.success !== false) throw new Error("RBAC check failed!");

  // 8. Server-Side Validation: Invalid Login Body
  console.log("\n8. Testing Server-side Zod Validation (Invalid Email)...");
  const valRes = await fetch(`${LIVE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "not-an-email", password: "" }),
  });
  const valJson = await valRes.json();
  console.log(`   Status: ${valRes.status} (Expected 400 Bad Request)`);
  console.log("   Structured Error Response:", valJson);
  if (valRes.status !== 400 || valJson.success !== false) throw new Error("Validation check failed!");

  // 9. 404 Route Handler
  console.log("\n9. Testing 404 Route Handler (GET /api/v1/non-existent)...");
  const notFoundRes = await fetch(`${LIVE_URL}/api/v1/non-existent-route`);
  const notFoundJson = await notFoundRes.json();
  console.log(`   Status: ${notFoundRes.status} (Expected 404 Not Found)`);
  console.log("   404 Response:", notFoundJson);
  if (notFoundRes.status !== 404 || notFoundJson.success !== false) throw new Error("404 handler check failed!");

  console.log("\n✨ ALL LIVE ENDPOINT VERIFICATION TESTS PASSED SUCCESSFULLY! 🚀");
}

verifyLive().catch((err) => {
  console.error("❌ Live verification failed:", err);
  process.exit(1);
});
