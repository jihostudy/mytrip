export default function PlanningStep({ onStep }) {
  const classes = "text-center h-20 pt-3 ";

  return (
    <>
      <ul className="mr-4 flex h-screen w-20 flex-col justify-center gap-6">
        <li className={classes}>
          <button onClick={() => onStep(1)}>
            Step1
            <br />
            날짜 선택
          </button>
        </li>
        <li className={classes}>
          <button onClick={() => onStep(2)}>
            Step2
            <br />
            장소 선택
          </button>
        </li>
        <li className={classes}>
          <button onClick={() => onStep(3)}>
            Step3
            <br />
            숙소 선택
          </button>
        </li>
      </ul>
    </>
  );
}
