import { render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import { ToastProvider } from './toast-provider';

describe('ToastProvider', () => {
  beforeEach(async () => {
    toast.dismiss();
    await new Promise((r) => setTimeout(r, 50));
  });

  it('renders the toaster container', () => {
    const { container } = render(<ToastProvider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays a success toast when triggered', async () => {
    render(<ToastProvider />);
    toast.success('Operation completed');
    expect(await screen.findByText('Operation completed')).toBeInTheDocument();
  });

  it('displays an error toast when triggered', async () => {
    render(<ToastProvider />);
    toast.error('Something went wrong');
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });

  it('prevents duplicate error toasts', async () => {
    render(<ToastProvider />);
    toast.error('Duplicate error');
    toast.error('Duplicate error');
    const messages = await screen.findAllByText('Duplicate error');
    expect(messages).toHaveLength(1);
  });

  it('does not show duplicate toasts with the same message and type', async () => {
    render(<ToastProvider />);
    toast.success('Duplicate message');
    toast.success('Duplicate message');
    const messages = await screen.findAllByText('Duplicate message');
    expect(messages).toHaveLength(1);
  });

  it('shows separate toasts for different messages', async () => {
    render(<ToastProvider />);
    toast.success('First message');
    toast.success('Second message');
    expect(await screen.findByText('First message')).toBeInTheDocument();
    expect(await screen.findByText('Second message')).toBeInTheDocument();
  });

  it('allows re-showing a toast after it is dismissed', async () => {
    render(<ToastProvider />);
    toast.success('Reappear');
    const closeButton = await screen.findByLabelText('Close notification');
    await closeButton.click();
    await waitFor(
      () => {
        toast.success('Reappear');
        const messages = screen.getAllByText('Reappear');
        expect(messages.length).toBeGreaterThanOrEqual(1);
      },
      { timeout: 3000 }
    );
  });

  it('renders blank toast without icon', async () => {
    render(<ToastProvider />);
    toast('Plain message');
    expect(await screen.findByText('Plain message')).toBeInTheDocument();
  });

  it('has close button on non-loading toasts', async () => {
    render(<ToastProvider />);
    toast.success('Can be closed');
    const closeButton = await screen.findByLabelText('Close notification');
    expect(closeButton).toBeInTheDocument();
  });

  it('displays an info toast', async () => {
    render(<ToastProvider />);
    (toast as unknown as Record<string, (m: string) => void>).info('Here is some information');
    expect(await screen.findByText('Here is some information')).toBeInTheDocument();
  });

  it('displays a warning toast', async () => {
    render(<ToastProvider />);
    (toast as unknown as Record<string, (m: string) => void>).warning('Be careful!');
    expect(await screen.findByText('Be careful!')).toBeInTheDocument();
  });

  it('prevents duplicate info toasts', async () => {
    render(<ToastProvider />);
    const t = toast as unknown as Record<string, (m: string) => void>;
    t.info('Info duplicate');
    t.info('Info duplicate');
    const messages = await screen.findAllByText('Info duplicate');
    expect(messages).toHaveLength(1);
  });

  it('prevents duplicate loading toasts', async () => {
    render(<ToastProvider />);
    toast.loading('Loading...');
    toast.loading('Loading...');
    const messages = await screen.findAllByText('Loading...');
    expect(messages).toHaveLength(1);
  });

  it('prevents duplicate warning toasts', async () => {
    render(<ToastProvider />);
    const t = toast as unknown as Record<string, (m: string) => void>;
    t.warning('Warning duplicate');
    t.warning('Warning duplicate');
    const messages = await screen.findAllByText('Warning duplicate');
    expect(messages).toHaveLength(1);
  });
});
