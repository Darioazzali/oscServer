import { container, greenBallStyle, redBallStyle } from "./style";


interface Props {
  isWsConnected?: boolean;
  ipAddress?: string;
}

const ConnectionStatus = (props: Props) => {
  const { isWsConnected, ipAddress } = props;
  return (
    <div style={container}>
      {!!isWsConnected ? <Connected /> : <NotConnected />}
      {!!ipAddress && <ServerAddress ipUrl={ipAddress} />}
    </div>
  );
};

export default ConnectionStatus;

const NotConnected = () => (
  <div style={{ display: "flex", gap: "8px" }}>
    <div style={redBallStyle} />
    <div>Offline</div>
  </div>
);
const Connected = () => (
  <div style={{ display: "flex", gap: "8px" }}>
    <div style={greenBallStyle} />
    <div>Online</div>
  </div>
);

const ServerAddress = ({ ipUrl }: { ipUrl: string }) => {
  const [address, port] = ipUrl.split(":");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <b>Indirizzo</b>: {address}
      </div>

      <div>
        <b>Porta</b>: {port}
      </div>
    </div>
  );
};
