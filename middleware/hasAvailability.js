export default function ({ route, $auth, redirect }) {
  if ($auth.loggedIn) {
    if (route.name !== 'availability') {
      if (!$auth.user.availability) {
        return redirect('/availability');
      }
    } else if ($auth.user.availability) {
      return redirect('/dashboard');
    }
  }
}
