import './index.scss';

export type PluginComment = { dataHref: string };
export const PluginComment = ({ dataHref }: PluginComment) => {
    return (
        <>
            <div
                className="fb-comments"
                data-href={dataHref}
                data-width="100%"
                data-numposts="5"
            ></div>
        </>
    );
};
