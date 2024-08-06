export default function LogIn() {
  return (
    <main>
      <div>
        <div className={styles.parentContainer}>
          <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
              <img src="eclipse-image.png" className={styles.image} />
            </div>
            <div className={styles.formOuterContainer}>
              <div className={styles.formInnerContainer}>
                <h1 className={styles.signInText}>SIGN IN</h1>
                <h3 className={styles.signUpText}>
                  Don't have an account yet?{" "}
                  <a href="/signup" className={styles.signUpRefText}>
                     Sign up!
                  </a>
                </h3>
                <form className={styles.form}>
                  <div className="w-full">
                    <label className={styles.label} htmlFor="username">
                      Username
                    </label>
                    <input
                      className={styles.input}
                      id="username"
                      type="text"
                      placeholder="username"
                    />
                  </div>
                  <div className="w-full">
                    <label className={styles.label} htmlFor="password">
                      Password
                    </label>
                    <input
                      className={styles.input}
                      id="password"
                      type="text"
                      placeholder="password"
                    />
                  </div>
                  <a
                    href="/forgot-password"
                    className={styles.forgotPasswordText}
                  >
                    Forgot your password?
                  </a>
                  <button className={styles.signInButton} type="submit">
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  parentContainer: "flex justify-center items-center h-[73vh]",
  mainContainer: "flex w-[85vw] bg-gray h-[70vh] rounded-md",
  imageContainer:
    "flex-1 bg-[black] w-[45vw] h-full rounded-bl-md rounded-tl-md",
  image: "w-full h-full object-contain",
  formOuterContainer:
    "flex-2 flex items-center justify-center w-[35vw] h-full rounded-md",
  formInnerContainer: "w-[25vw] flex-col justify-center",
  signInText: "font-bold text-[3vw]",
  signUpText: "font-md text-[1vw]",
  signUpRefText: "underline text-light-orange hover:text-dark-orange",
  form: "flex flex-col mt-[5vh] space-y-[2vh]",
  label: "block uppercase text-gray-700 text-xs font-bold mb-[0.75vh]",
  input:
    "w-full bg-gray-200 text-gray-700 active:border-b focus:outline-dark-orange rounded py-[1.25vh] px-[0.75vw] mb-[0.75vh] leading-tight focus:bg-white",
  forgotPasswordText:
    "underline text-[0.90vw] text-light-orange hover:text-dark-orange w-[11vw]",
  signInButton:
    "bg-light-orange text-white font-bold py-[1.25vh] px-[0.75vw] rounded hover:bg-dark-orange focus:outline-none focus:shadow-outline",
};
