type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex items-center justify-center h-10">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm12-1.662A7.963 7.963 0 0120 12h4c0 4.418-3.582 8-8 8v-4zM16.708 5.708A7.963 7.963 0 0120 12h4c0-4.418-3.582-8-8-8v4zm-8.497 8.497a.75.75 0 01-1.061-1.061l2.122-2.122a.75.75 0 011.061 1.061l-2.122 2.122zm9.192 0l-2.122-2.122a.75.75 0 011.061-1.061l2.122 2.122a.75.75 0 01-1.061 1.061z"
        ></path>
      </svg>
      Carregando...
    </div>
  );
}
