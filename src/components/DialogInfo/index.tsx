import ButtonPrimary from '../ButtonPrimary';

type Props = {
  message: string;
  onDialogClose: Function;
};

export default function DialogInfo({ message, onDialogClose }: Props) {
  return (
    <div onClick={() => onDialogClose()} className="dsc-dialog-background">
      <div
        onClick={(event) => event.stopPropagation()}
        className="dsc-dialog-box"
      >
        <h2>{message}</h2>
        <div
          className="dsc-dialog-btn"
          onClick={() => onDialogClose()}
        >
          <ButtonPrimary text="Ok" />
        </div>
      </div>
    </div>
  );
}
