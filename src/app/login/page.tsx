

export default function LogIn() {
  return (
    <main>
      <div>
        <div className={styles.parentContainer}>
          <div className={styles.mainContainer}>
            <div className={ styles.imageContainer }> 
              <img src="eclipse-image.png" className={styles.image}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  parentContainer: "flex justify-center items-center",
  mainContainer: " w-[80vw] bg-[#f5f5f5] h-[70vh] rounded-md",
  imageContainer: "bg-[black] w-[45vw] h-full rounded-md",
  image: "w-full h-full object-contain",

};
