
'use client';

// This component renders a third-party affiliate ad in a sandboxed iframe
// using the srcDoc attribute. This is the safest way to inject arbitrary
// HTML/CSS/JS that uses legacy techniques like document.write, as it
// prevents the ad code from affecting the main application document.

export default function VpnAffiliateAd() {
  // The user's provided HTML/JS/CSS code block
  const adHtml = `
    <html>
    <head>
      <style type="text/css">
          body { margin: 0; font-family: Tahoma, Verdana, sans-serif; background-color: transparent; color: hsl(var(--foreground));}
          a { color: #1e73be; }
          .blink_me {
              font-size : 20pt;
              color     : red;
              animation : blinker 1s linear infinite;
          }
          #btvpn {
              box-shadow      : 2px 3px #ccc;
              width           : 200px;
              margin          : 15px auto;
              display         : block;
              text-decoration : none;
              font-size       : 15px;
              background      : red;
              color           : #fff;
              border-radius   : 4px;
              padding         : 9px 0 8px;
              font-weight     : bold;
              border          : 1px solid black;
          }
          @keyframes blinker {
              50%{opacity:0;}
          }
      </style>
      <script type="application/javascript" src="https://get-trust-zone.info/api_ip_info.php?js=1" async></script>
    </head>
    <body>
      <div id="vpnvpn" style="text-align:center;cursor:pointer;padding-bottom:5px;" onclick="window.open('https://get-trust-zone.info/r.php?RID=B-HTOWx-MDAxNzUwNTE0MTcx', '_blank');">
          <script type="application/javascript">
              if (typeof tz_ipaddress !== 'undefined' && tz_ipaddress == 'HIDDEN') {
                  document.getElementById('vpnvpn').style.display = 'none';
              }
          </script>
          <div style="font-size:18pt;padding:10px 0;text-align:center;color:red;font-weight:bolder;" id="wrn">
              Warning! Use a VPN When Downloading Torrents!
          </div>
          <script type="application/javascript">
            document.addEventListener('DOMContentLoaded', function() {
              var titles = ['Warning! Use a VPN When Downloading Torrents!', 'Do NOT download any torrent before hiding your IP with a VPN', 'Lawsuits and Huge Fines When Downloading Torrents!', 'Hide Your IP Address when Downloading Torrents!', 'Before downloading torrents hide your IP from the Government!'];
              var titles2 = ['Get VPN for FREE', 'Get VPN Now', 'Get Free VPN', 'Hide IP with VPN', 'Hide My IP Now!'];
              var i = (Math.random() * titles.length) | 0;
              var wrnEl = document.getElementById('wrn');
              if (wrnEl) wrnEl.innerText = titles[i];
              var btvpnEl = document.getElementById('btvpn');
              if (btvpnEl) btvpnEl.innerText = titles2[i];
            });
          </script>
          <div style="padding:0 0 8px;font-size:15px;line-height:25px;">
              <div id="iploc" style="padding-bottom:5px;">
                  <script type="application/javascript">
                      if (typeof tz_ipaddress === 'undefined' || tz_ipaddress === null) {
                          var iplocEl = document.getElementById('iploc');
                          if(iplocEl) iplocEl.style.display = 'none';
                      }
                  </script>
                  <b>Your IP Address</b> is <span style="color:red;font-weight:bold;background-color:yellow;padding:3px; color: #000;"><script lang="javascript">if(typeof tz_ipaddress !== 'undefined') document.write(tz_ipaddress);</script></span>.
                  <b>Location</b> <span style="color:red;font-weight:bold;background-color:yellow;padding:3px; color: #000;"><script lang="javascript">if(typeof tz_country !== 'undefined') document.write(tz_country);</script></span>
              </div>
              Your Internet Provider <span style="color:red;font-weight:bold;background-color:yellow; color: #000;"><script type="text/javascript">if(typeof tz_isp !== 'undefined') document.write(tz_isp);</script></span> can see when you download torrents!
              <b>Hide your IP Address with a VPN</b><br />
              <span class="blink_me">⚠</span><b><span style="color:red;font-weight:bold;font-size:105%;padding:2px; border-bottom:dashed;">Trust.Zone warns:</span> </b>
              <span style="">You must use <a href="https://trust.zone/" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;font-weight:bold;color:#1e73be;">Trust.Zone VPN</a> to hide your torrenting. </span>
              <span style="color:red;font-weight:bold;border-color:red">It's FREE</span>
              <a id="btvpn" href="https://get-trust-zone.info/r.php?RID=B-HTOWx-MDAxNzUwNTE0MTcx" target="_blank" rel="noopener noreferrer" onmouseover="this.style.background='#e02c3c';" onmouseout="this.style.background='#ff0000';">HIDE ME NOW</a>
          </div>
      </div>
      <div id="alter"></div>
      <script type="application/javascript">
        document.addEventListener('DOMContentLoaded', function() {
          if (typeof tz_ipaddress !== 'undefined' && tz_ipaddress == 'HIDDEN') {
              var alterEl = document.getElementById('alter');
              if(alterEl) {
                alterEl.innerHTML = '<div style="text-align:center;"><a href="https://get-trust-zone.info/r.php?RID=B-HTOWx-MDAxNzUwNTE0MTcx" target="_blank" rel="noopener noreferrer"><img src="https://get-trust-zone.info/images/b/Iknowyoudownloaded_trustzone_vpn_noet.gif" width="728" height="90" /></a></div>';
              }
          }
        });
      </script>
    </body>
    </html>
  `;

  return (
    <div className="my-8 bg-card/50 p-4 rounded-lg">
       <iframe
        srcDoc={adHtml}
        title="VPN Affiliate Advertisement"
        style={{ width: '100%', height: '350px', border: 'none', overflow: 'hidden' }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
