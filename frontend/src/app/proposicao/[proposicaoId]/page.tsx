"use client"

import styled from "styled-components";

import styles from '../../page.module.css'
import { BackIcon } from "@/components/icons/back-icon";
import Link from "next/link";
import { useEffect, useState } from "react";


const InfoContainer = styled.div`
    width: 100%;
    padding: 10px 10px 50px 10px;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 40px;
        font-weight: 600;
    }
    h2 {
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 24px;
    }
    h3 {
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 24px;
    }
`;

const ProposicaoPageContainer = styled.div`
    margin: 50px 0px;
    width: 1000px;
    min-height: 164px; 
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Titulo = styled.span`
    font-weight: 600;
`;

const Valor = styled.span`
    font-weight: 300;
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0px;
    }
`;

const ValorAutores = styled.span`
    font-weight: 300;
    margin-bottom: 0px;
`;

const BackButton = styled.button`
    width: 100px;
    padding: 6px 0px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 8px;
    cursor: pointer;
    color: #fff;
    background-color: #468bcf;
    border: none;
    font-size: 14px;
    font-family: inherit;
    font-weight: 600;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3a7aa6;
    }
`;

const AutoresContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

interface Autores {
    nome: string;
    tipo: string;
}

interface StatusProposicao {
    apreciacao: string;
}

interface Proposicao {
    siglaTipo: string;
    numero: number;
    ano: number;
    descricaoTipo: string;
    dataApresentacao: string;
    ementa: string;
    keywords: string;
    statusProposicao: StatusProposicao;
}

export default function Proposicao({ params }: { params: { proposicaoId: string } }) {
    const [data, setData] = useState<Proposicao>();
    const [autores, setAutores] = useState<Autores[]>([]);

    function formatarData(dataISO: string) {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${params.proposicaoId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                const data = await response.json()
                setData(data.dados);

            } catch (e) {

            }
        }

        const fetchAutores = async () => {
            try {
                const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${params.proposicaoId}/autores`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                const data = await response.json()
                setAutores(data.dados);

            } catch (e) {

            }

        }
        
        fetchData();
        fetchAutores();
    }, []);


    return (
        <main className={styles.main}>
            <ProposicaoPageContainer>

                <InfoContainer>
                    <Link
                        href="/"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    ><BackButton><BackIcon />Voltar</BackButton></Link>

                    {data && <h1>{data.siglaTipo} {data.numero}/{data.ano}</h1>}
                    {data && <h2>{data.descricaoTipo}</h2>}

                    <Titulo>Autores</Titulo>

                    <AutoresContainer>
                        {autores && autores.map((autor, index) => (

                            <ValorAutores key={index}>{autor.nome} ({autor.tipo})</ValorAutores>
                        )

                        )}
                    </AutoresContainer>



                    <Titulo>Data de apresentação</Titulo>
                    {data && <Valor>{formatarData(data.dataApresentacao)}</Valor>}

                    <Titulo>Ementa</Titulo>
                    {data && <Valor>{data.ementa ? data.ementa : '-'}</Valor>}

                    <Titulo>Palavras-chave</Titulo>
                    {data && <Valor>{data.keywords ? data.keywords : '-'}</Valor>}

                    <h3>Informações de Tramitação</h3>

                    <Titulo>Forma de Apreciação</Titulo>
                    {data && <Valor>{data.statusProposicao.apreciacao ? data.statusProposicao.apreciacao : '-'}</Valor>}




                </InfoContainer>
            </ProposicaoPageContainer>
        </main >
    )
}
