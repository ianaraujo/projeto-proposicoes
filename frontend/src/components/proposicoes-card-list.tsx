"use client"


import styled from "styled-components";
import { ProposicaoCard, ProposicaoCardInfo } from "./proposicao-card";


const SemRegistrosDiv = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface ProposicaoCardListProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEditInfo: React.Dispatch<React.SetStateAction<ProposicaoCardInfo>>;
    isModalOpen: boolean;
    proposicoes: ProposicaoCardInfo[];

}

export default function ProposicaoCardList(props: ProposicaoCardListProps) {
 
    const { proposicoes } = props;

  

    return (
        <div>
            {proposicoes.length === 0 ? (
                <SemRegistrosDiv>
                    <p>Não há registros...</p>
                </SemRegistrosDiv>
            ) : (
                proposicoes.map((proposicao, index) => (
                    <ProposicaoCard key={index} {...proposicao} {...props} />
                ))
            )}
        </div>
    );
}