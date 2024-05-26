import { HeaderPay } from '../../component/header-pay';
import './index.scss';
import { MoviesPackageBill } from '../../component/movies-package-bill';

export const Bill = () => {
    return (
        <div>
            <HeaderPay currentStep={2} />
            <div className="bill">
                <div className="bill__info">
                    <MoviesPackageBill />
                </div>
            </div>
        </div>
    );
};
