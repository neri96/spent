import Button from "@components/ui/Button";

const ErrorFallback = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

export default ErrorFallback;
