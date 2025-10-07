export class SteamAuthClient {
  private readonly realm: string;
  private readonly returnUrl: string;

  constructor(config: { realm: string; returnUrl: string }) {
    this.realm = config.realm;
    this.returnUrl = config.returnUrl;
  }

  // Generate Steam OpenID login URL (client-side)
  getLoginUrl(): string {
    const params = new URLSearchParams({
      "openid.ns": "http://specs.openid.net/auth/2.0",
      "openid.mode": "checkid_setup",
      "openid.return_to": this.returnUrl,
      "openid.realm": this.realm,
      "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
      "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    });

    return `https://steamcommunity.com/openid/login?${params.toString()}`;
  }

  // Redirect to Steam login
  login(): void {
    window.location.href = this.getLoginUrl();
  }

  // Parse Steam callback parameters from URL
  parseCallback(url: string = window.location.href): SteamCallbackParams {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};

    // Extract all openid.* parameters
    for (const [key, value] of urlObj.searchParams.entries()) {
      if (key.startsWith("openid.")) {
        params[key] = value;
      }
    }

    // Extract Steam ID from claimed_id
    // Format: https://steamcommunity.com/openid/id/76561198123456789
    const claimedId = params["openid.claimed_id"];
    let steamId = "";

    if (claimedId) {
      const matches = claimedId.match(/\/id\/(\d+)$/);
      if (matches?.[1]) {
        steamId = matches[1];
      }
    }

    return {
      ...params,
      steamId,
    };
  }
}

export interface SteamCallbackParams {
  [key: string]: string;
  steamId: string;
}
