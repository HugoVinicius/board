import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import 'next-auth'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
  ],
  callbacks:{
    async session({ session, token }: any) {
      try {
        return{
          ...session,
          id: token.sub,
        }

      }catch{
        return{
          ...session,
          id:null,
        }
      }
    },
    async signIn({user}: any) {
      const {email} = user;
      try {
        console.log('singIn email: ', email)
        return true;
      } catch (err) {
        console.log('Erro', err);
        return false;
      }

    }
  }  
}

export default NextAuth(authOptions)