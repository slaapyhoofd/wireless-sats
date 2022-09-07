import { handleLNURL, NFCReader } from 'lnurl-nfc';

function log(text: string) {
  const textarea = document.getElementById('textarea') as HTMLTextAreaElement;

  if (textarea) {
    textarea.value += `${text}\n`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const invoice = document.getElementById('invoice') as HTMLInputElement;
  const button = document.getElementById('button');

  log('ready');

  button?.addEventListener('click', async () => {
    try {
      const nfcReader = new NFCReader();
      await nfcReader.listen((lnurl) => {
        log(`lnurl: ${lnurl}`);
        handleLNURL(lnurl, invoice?.value, 'proxy.php').then(() => log('done!!'));
      });
      log('listening');
    } catch (e: any) {
      log(e.message);
    }
  });
});
