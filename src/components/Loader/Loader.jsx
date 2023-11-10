import { ProgressBar } from  'react-loader-spinner'
import { Load } from './Loader.styled';

export const Loader = () =>
(<Load>
    <ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#F4442E'
  barColor = '#51E5FF'
/>
</Load>);