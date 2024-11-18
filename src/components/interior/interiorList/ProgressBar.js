const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: '20px',
          backgroundColor: '#6D885D',
          borderRadius: '5px',
        }}
      />
    </div>
  );
};

export default ProgressBar;
