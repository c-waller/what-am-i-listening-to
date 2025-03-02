import pkceChallenge from 'pkce-challenge';

async function getVerifierAndChallenge(): Promise<{ codeVerifier: string; codeChallenge: string } | null> 
{
    try 
    {
        const { code_verifier, code_challenge } = await pkceChallenge();
        return { codeVerifier: code_verifier, codeChallenge: code_challenge };
    } 
    catch (error) 
    {
        console.error("Error generating PKCE pair: ", error);
        return null;
    }
}

export default async function getSpotifyLoginUrl(): Promise<{url: string, codeVerifier: string} | null>
{    
    const scopes = [
        "playlist-read-private",
        "user-read-private", // account type
        "user-read-recently-played",
        "user-library-read", 
        "user-follow-read",
        "user-top-read"
    ];
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const verifierAndChallenge = await getVerifierAndChallenge();
      
    if (!verifierAndChallenge) // failure
    {
        return null;
    }
    const {codeVerifier, codeChallenge} = verifierAndChallenge;
    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    return { url: loginUrl, codeVerifier: codeVerifier };
}