import DefaultLayout from "hoc/Layout/DefaultLayout";
import "./css/DetailAnime.css";

const DetailAnime = () => {
    return(
        <DefaultLayout>
            <div className="detail-ctn-wrapper">
                <div className="left-container rnd-border-1">
                    <div className="main-content">
                        <div className="big-box rnd-border-1">
                            <div className="large-main"></div>
                        </div>
                        <div className="sec-content">
                            <div className="title-box rnd-border-1">test</div>
                            <div className="description-box rnd-border-1">test</div>
                        </div>
                    </div>
                </div>
                <div className="right-container rnd-border-1">
                    <div className="small-box rnd-border-1">test</div>
                    <div className="small-box rnd-border-1">test</div>
                    <div className="small-box rnd-border-1">test</div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default DetailAnime;