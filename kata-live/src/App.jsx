import "./App.css";

function Avatar({ url, size }) {
  return (
    <img
      src={url}
      width={size}
      height={size}
      alt="Avatar de usuario"
      style={{
        borderRadius: "50%",
        border: "3px solid #6366f1",
      }}
    />
  );
}
function App() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar url="https://i.pravatar.cc/150?img=1" size={80} />
      <Avatar url="https://i.pravatar.cc/150?img=2" size={120} />
      <Avatar url="https://i.pravatar.cc/150?img=3" size={60} />
    </div>
  );
}

export default App;
