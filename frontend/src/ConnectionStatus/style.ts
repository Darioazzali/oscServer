export const redBallStyle: React.CSSProperties = {
  width: "20px",
  height: "20px",
  borderRadius: "90px",
  backgroundColor: "red",
};

export const greenBallStyle: React.CSSProperties = {
  ...redBallStyle,
  backgroundColor: "green",
};

export const container: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  marginBottom: "20px",
};