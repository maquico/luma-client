import supabase from '../configs/supabase';

async function signOut(scope) {
  try {
    const { error } = await supabase.auth.signOut({
      scope: scope,
    });
    return { error };
  } catch (error) {
    return console.error(error.message);
  }
}

// async function signOut(req, res) {
//   try {
//     const { scope } = req.body;
//     const { error } = await supabase.auth.signOut({
//       scope: scope,
//     });
//     if (error) {
//       return res.status(400).send(error.message);
//     }
//     return res.status(200).send('Signed out successfully');
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// }


// async function signOut() {
//   try {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       return res.status(400).send(error.message);
//     }
//     return res.status(200);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// }

module.exports = {
  signOut,
};