import { useParams } from 'react-router-dom';
import { Error404Page } from '@/pages';
import { Error500Page } from '@/pages';

const ErrorPage = () => {
  const { type } = useParams<{ type: string }>();

  switch (type) {
    case '500':
      return <Error500Page />;

    case '404':
      return <Error404Page />;

    default:
      return <Error404Page />;
  }
};

export default ErrorPage;
