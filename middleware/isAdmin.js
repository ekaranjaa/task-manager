export default function ({ $auth, redirect }) {
  if ($auth.loggedIn && $auth.user.role.name !== 'admin') {
    return redirect('/dashboard');
  }
}
