export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">HealthMate Dashboard</h1>
      <p>Welcome to your daily wellness tracker.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 border rounded shadow">Medicine Tracking</div>
        <div className="p-4 border rounded shadow">Water Intake</div>
        <div className="p-4 border rounded shadow">Sleep Log</div>
        <div className="p-4 border rounded shadow">Diet Log</div>
      </div>
    </div>
  );
}
