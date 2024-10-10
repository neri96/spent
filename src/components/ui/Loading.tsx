import Backdrop from "./Backdrop";

const Loading = ({ isFullPage }: { isFullPage?: boolean }) => {
  const loadingElement = (
    <svg
      version="1.1"
      id="Layer_1"
      viewBox="0 0 100 100"
      height="150"
      role="img"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <rect
        fill="#fff"
        width="3"
        height="100"
        transform="translate(0) rotate(180 3 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="17"
        fill="#fff"
        width="3"
        height="100"
        transform="translate(0) rotate(180 20 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </rect>
      <rect
        x="40"
        fill="#fff"
        width="3"
        height="100"
        transform="translate(0) rotate(180 40 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </rect>
      <rect
        x="60"
        fill="#fff"
        width="3"
        height="100"
        transform="translate(0) rotate(180 58 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </rect>
      <rect
        x="80"
        fill="#fff"
        width="3"
        height="100"
        transform="translate(0) rotate(180 76 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </rect>
    </svg>
  );

  return (
    <div aria-busy={true} aria-live="polite" aria-label="Loading">
      {isFullPage ? (
        <Backdrop isOpen>{loadingElement}</Backdrop>
      ) : (
        loadingElement
      )}
    </div>
  );
};

export default Loading;
