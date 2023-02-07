import ButtonInverse from '../ButtonInverse';
import ButtonPrimary from '../ButtonPrimary';

type Props = {
  message: string;
  onDialogAnswer: Function;
};

export default function DialogConfirmation({ message, onDialogAnswer }: Props) {
  return (
    <div
      onClick={() => onDialogAnswer(false)}
      className="dsc-dialog-background"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="dsc-dialog-box"
      >
        <h2>{message}</h2>
        <div className="dsc-dialog-btn-container">
          <div onClick={() => onDialogAnswer(false)}>
            <ButtonInverse text="Não" />
          </div>
          <div onClick={() => onDialogAnswer(true)}>
            <ButtonPrimary text="Sim" />
          </div>
        </div>
      </div>
    </div>
  );
}
