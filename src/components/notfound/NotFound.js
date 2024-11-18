const NotFound = () => {
  return (
    <div
      style={{
        height: 'calc(100vh - 269px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ fontSize: '40px', marginBottom: '20px' }}>404 NOT FOUND</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
