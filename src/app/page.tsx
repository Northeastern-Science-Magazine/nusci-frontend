import Text from "../components/Text";

export default function Home() {
  return (
    <main>
      <p>Welcome to the home page!</p>
      <Text text="This is plain text." />
      <Text text="This is italic text." italic/>
      <Text text="This is bold text." bold/>
      <Text text="This is underlined text." underline/>
      <Text text="This text is bold, italic, and underlined." bold italic underline />
      <Text text="This text is large." size="text-xl" />
      <Text text="This text is light orange." color="text-light-orange" />
      <Text text="This text is small and dark orange." size="text-sm" color="text-dark-orange"/>
      <hr></hr>

      <Text text="Lorem ipsum odor amet, consectetuer adipiscing elit. Nostra eget himenaeos finibus vivamus lacinia nec felis platea. Lacus ullamcorper elit curabitur cras facilisi pretium. Enim lacus felis sapien natoque venenatis. Massa eget at volutpat neque eleifend convallis suspendisse suscipit. Tellus est iaculis justo feugiat mauris libero, finibus libero.
      Adipiscing nisi sem accumsan augue bibendum porttitor ipsum. Viverra hac ut est imperdiet phasellus habitasse feugiat convallis. At porta amet dapibus mattis vel quisque sodales. Ultrices metus sociosqu curae metus rutrum suscipit. Tincidunt metus eu eros nisi netus. Ad cursus accumsan risus enim pharetra dolor. Magnis non a cubilia magnis in dis." size="test-xs" bold italic underline color="text-dark-orange"/>
    </main>
  );
}



