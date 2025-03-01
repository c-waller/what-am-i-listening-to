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
        console.error("Error generating PKCE challenge:", error);
        return null;
    }
}

