"use client"

import styled from "styled-components"
import { EditIcon } from "./icons/edit-icon";
import Link from "next/link";

const CardContainer = styled.div`
    width: 100%;
    padding: 10px;
    height: 120px;
    
    
    border-bottom: 1px solid #D9D9D9;
    &:last-child {
        border-bottom: none; 
    }



    display: flex;
    gap: 30px;

   

    h1 {
        font-size: 26px;
        font-family: inherit;
        font-weight: 600;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    h2 {
        font-size: 20px;
        font-family: inherit;
        font-weight: 400;
    }
    a {
        color: #468bcf;
        font-size: 14px;
        font-family: inherit;
        font-weight: 400;
        &:hover {
            text-decoration: underline;
        }
        
    }

  


`;

const KeywordList = styled.ul`
    display: flex;

    align-items: center;
    list-style-type: none;
    padding: 0;
    flex-wrap: wrap;
    gap: 10px;
`;

const KeywordItem = styled.li`
  display: inline-block;
  
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;

  button {
    margin-left: 8px;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const H2AContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HalfContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
`;

const EditarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
 
 
`;

const EditButton = styled.button`
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease; 
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1); 
    }
    font-family: inherit;
    h3 {
        font-family: inherit;
        font-size: 16px;
        color: #468bcf;
        font-weight: 600;
      }

`;

const MaisInfoButton = styled.button`
    gap: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    padding: 4px 6px;
    border-radius: 8px;
    font-family: inherit;

  
    
    cursor: pointer;
    transition: background-color 0.3s; 
    &:hover {
      background-color: rgba(0, 0, 0, 0.7); 
    }
    h3 {
        font-family: inherit;
        font-size: 14px;
        color: white;
        font-weight: 500;
      }

`;

export interface ProposicaoCardInfo {
    nome: string;
    url: string;
    tipo: string;
    numero: string;
    ano: string;
    palavrasChave: string[];
    id: string;
}

export const initialProposicaoCardInfo: ProposicaoCardInfo = {
    nome: '',
    url: '',
    tipo: '',
    numero: '',
    ano: '',
    palavrasChave: [],
    id: ''
}

export interface ProposicaoCardProps extends ProposicaoCardInfo {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEditInfo: React.Dispatch<React.SetStateAction<ProposicaoCardInfo>>;
}

export function ProposicaoCard(props: ProposicaoCardProps) {
    const { setIsModalOpen, setIsEditModal, setEditInfo } = props;
    const toggleModal = () => {
        setEditInfo(props)
        setIsEditModal(true);
        setIsModalOpen(true);
    };

    return (
        <CardContainer>
            <HalfContainer>
                <h1>{props.nome}</h1>
                <H2AContainer>
                    <h2>{props.tipo} {props.numero}/{props.ano}</h2>
                    {props.url && <a href={props.url}>URL</a>}


                    <Link
                        href={`/proposicao/${props.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <MaisInfoButton><h3>Informações detalhadas</h3></MaisInfoButton>
                    </Link>


                </H2AContainer>
            </HalfContainer>
            <HalfContainer>

                <KeywordList>
                    {props.palavrasChave && props.palavrasChave.map((keyword, index) => (
                        < KeywordItem key={index} > {keyword}</KeywordItem>
                    ))}
                </KeywordList>


            </HalfContainer>

            <EditarContainer>

                <EditButton onClick={() => { toggleModal() }}>

                    <EditIcon />
                    <h3>Editar</h3>
                </EditButton>

            </EditarContainer>

        </CardContainer >
    )

}