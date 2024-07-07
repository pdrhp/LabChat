

type DotBounceIconProps = {
  dotColor?: string,
  dotSize?: string,
}


const DotBounceIcon: React.FC<DotBounceIconProps> = ({dotColor = 'white', dotSize = '1'}) => {

  const teste = `w-[${dotSize}rem]`

  console.log(teste);

  return (
    <div className="flex justify-center items-center h-full space-x-2">
      <div className={`w-[0.2rem] h-[0.2rem] bg-white rounded-full animate-bounce delay-0`}></div>
      <div className={`w-[0.2rem] h-[0.2rem] bg-white rounded-full animate-bounce delay-200`}></div>
      <div className={`w-[0.2rem] h-[0.2rem] bg-white rounded-full animate-bounce delay-400`}></div>
    </div>
  )
}

export default DotBounceIcon
