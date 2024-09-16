import { Row, message } from 'antd'

interface propsFrmLabel {
  label: string
  require?: boolean
  className?: any
}

export default function FormLabel({
  label = '',
  require = false,
  className,
}: propsFrmLabel) {
  return (
    <>
      <Row className={className}>
        <div className={''}>
          <span
            className={
              'mb-[6px] text-[14px] capitalize text-black sm:text-[14pxpx] md:text-[14px] lg:text-[16px] xl:text-[16px]'
            }
          >
            {label}
          </span>
          {require && (
            <span className={'ml-[4px]'}>
              (<span className="text-[color:var(--light-red)]">Required</span>)
            </span>
          )}
        </div>
      </Row>
    </>
  )
}
