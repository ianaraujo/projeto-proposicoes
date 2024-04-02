"use client"



import styles from "./page.module.css";


import { useDeferredValue, useEffect, useState } from "react";

import { CadastroModal } from "@/components/cadastro-modal";
import { FilterBar } from "@/components/filter-bar";
import { ProposicaoCardInfo, initialProposicaoCardInfo } from "@/components/proposicao-card";
import ProposicaoCardList from "@/components/proposicoes-card-list";



export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editInfo, setEditInfo] = useState<ProposicaoCardInfo>(initialProposicaoCardInfo);
  const [proposicoes, setProposicoes] = useState<ProposicaoCardInfo[]>([]);
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [type, setType] = useState<string>('');
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number>(0);
  const [att, setAtt] = useState(false);


  useEffect(() => {
    async function fetchProposicoes() {
      try {
        const response = await fetch('http://localhost:3333/proposicoes');
        if (!response.ok) {
          throw new Error('Erro ao buscar proposições');
        }
        const data = await response.json();
        setProposicoes(data.proposicoes);

        const tipos = new Set<string>(data.proposicoes.map((proposicao: ProposicaoCardInfo) => proposicao.tipo));
        const sortedTipos = Array.from(tipos).sort();
        setTypes(sortedTipos);

        const years = new Set<number>(data.proposicoes.map((proposicao: ProposicaoCardInfo) => parseInt(proposicao.ano)));
        const sortedYears = Array.from(years).sort((a, b) => b - a);
        setYears(sortedYears);


      } catch (error) {
        console.error('Erro ao buscar proposições:', error);
      }
    }

    fetchProposicoes();
  }, [att]);

  const searchDeferred = useDeferredValue(search);

  const filteredProposicoes = proposicoes?.filter(proposicao => {

    // Tipo
    const tipoMatches = !type || proposicao.tipo === type;

    // Ano
    const yearMatches = !year || parseInt(proposicao.ano) === year;

    // Search bar
    const removeExtraSpaces = (str: string) => str.replace(/\s+/g, ' ').trim();
    const searchWords = removeExtraSpaces(searchDeferred).toLowerCase().split(' ');
    const { nome, tipo, numero, ano, palavrasChave } = proposicao;
    const searchMatches = searchWords.some(searchWord =>
      [nome, tipo, numero, ano, ...palavrasChave].some(value =>
        value && value.toString().toLowerCase().includes(searchWord.trim())
      )
    );

    return tipoMatches && yearMatches && searchMatches;
  });


  return (
    <main className={styles.main}>
      <div className={styles.mainSection}>

        <CadastroModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isEditModal={isEditModal}
          editInfo={editInfo}
          att={att}
          setAtt={setAtt}
        />

        <FilterBar
          setIsModalOpen={setIsModalOpen}
          setIsEditModal={setIsEditModal}
          search={search}
          setSearch={setSearch}
          year={year}
          setYear={setYear}
          years={years}

          type={type}
          setType={setType}
          types={types}

        />

        <ProposicaoCardList
          proposicoes={filteredProposicoes}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setIsEditModal={setIsEditModal}
          setEditInfo={setEditInfo}
        />

      </div>
    </main>
  );
}
