import { type RouteProps } from 'react-router-dom';
import { pathConstants } from '@/shared/lib/constants/paths';

/*
import { HomePage } from '@/pages';
import { RegistrationPage } from '@/pages';
import { CardDetailPage } from '@/pages';
import { ProfilePage } from '@/pages';
*/
import { Error404Page } from '@/pages';
import { Error500Page } from '@/pages';

export const routeConfig: RouteProps[] = [
  {
    path: pathConstants.MAIN
    // element: <HomePage />,
  },
  {
    path: pathConstants.REGISTER
    // element: <RegistrationPage />,
  },
  {
    path: pathConstants.CARD
    // element: <CardDetailPage />,
  },
  {
    path: pathConstants.PROFILE
    // element: <ProfilePage />,
  },
  {
    path: pathConstants.ERROR_PAGE,
    element: <Error500Page />
  },
  {
    path: pathConstants.NOT_FOUND,
    element: <Error404Page />
  }
];
