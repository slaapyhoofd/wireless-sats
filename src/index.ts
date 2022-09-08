import { handleLNURL, NFCReader } from 'lnurl-nfc';
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
      const nfcReader = new NFCReader();
      await nfcReader.listen((lnurl) => {
        log(`lnurl found`);
        handleLNURL(lnurl, invoice?.value, 'proxy.php').then((result) => {
          if (result.success) {
            log('invoice paid!');
          } else {
            log(result.message, true);
          }
          buttonListen.ariaBusy = 'false';
        });
      });
      log('listening');
    } catch (e: any) {
      log(e.message, true);
    }
  });
});
