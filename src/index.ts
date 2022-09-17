import { ErrorReason, handleLNURL, LnurlReader } from 'lnurl-nfc';
import QrScanner from 'qr-scanner';

function log(text: string, error?: boolean) {
  const logElement = document.getElementById('log');

  if (logElement) {
    const line = document.createElement('div');
    line.innerHTML = `${text}\n`;
    if (error) {
      line.style.color = 'red';
    }
    logElement.appendChild(line);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const invoice = document.getElementById('invoice') as HTMLInputElement;
  const buttonPaste = document.getElementById('paste');
  const buttonListen = document.getElementById('listen');
  const buttonScan = document.getElementById('scan');
  const video = document.getElementById('video') as HTMLVideoElement;

  log('ready');

  buttonPaste?.addEventListener('click', function () {
    navigator.clipboard.readText().then(
      (text) => {
        if (invoice) {
          invoice.value = text;
        }
        log('lnurl copied');
      },
      () => log('error copying lnurl', true),
    );
  });

  const qrScanner = new QrScanner(
    video,
    (result) => {
      log('QR found');
      invoice.value = result.data;
      qrScanner.stop();
      if (buttonScan) {
        buttonScan.ariaBusy = 'false';
      }
    },
    { returnDetailedScanResult: true },
  );

  buttonScan?.addEventListener('click', () => {
    qrScanner.start();
    buttonScan.ariaBusy = 'true';
  });

  buttonListen?.addEventListener('click', async () => {
    try {
      buttonListen.ariaBusy = 'true';

      const lnurlReader = new LnurlReader();
      lnurlReader.onLnurlRead = async (lnurl) => {
        log(`lnurl found`);
        await handleLNURL(lnurl, invoice?.value, 'proxy.php').then((result) => {
          if (result.success) {
            log('invoice payment initiated!');
          } else {
            log(result.message, true);
          }
        });
        buttonListen.ariaBusy = 'false';
      };

      lnurlReader.onReadingError = (error, detail) => {
        log(`reading error: ${ErrorReason[error]}${detail ? `, type: ${detail.type}` : ''}`, true);
      };

      log('Checking NFC permissions');
      await lnurlReader.startListening();
      log('listening for NFC tags');
    } catch (e: any) {
      buttonListen.ariaBusy = 'false';
      if (e in ErrorReason) {
        log(ErrorReason[e], true);
      } else {
        log(e.message, true);
      }
    }
  });
});
