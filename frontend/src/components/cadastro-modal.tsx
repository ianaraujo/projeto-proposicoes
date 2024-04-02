"use client"

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CloseIcon } from './icons/close-icon';
import { WhitePlusIcon } from './icons/white-plus-icon';
import { ProposicaoCardInfo } from './proposicao-card';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
    max-height: calc(100vh - 40px); 
    overflow-y: auto; 
`;

const Title = styled.h1`
    font-weight: 500;
    font-size: 24px;
`;

const Button = styled.button<isEditProps>`
    margin-top: 30px;
    font-family: inherit;
    font-weight: 400;
    font-size: 20px;
    padding: 8px 16px;
    background-color: ${props => props.edit ? '#468bcf' : 'rgb(81, 184, 83)'};
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.edit ? '#3a7aa6' : '#4c9d4c'};
    }
`;


const DeleteButton = styled.button`
    margin-top: 30px;
    font-family: inherit;
    font-weight: 400;
    font-size: 20px;
    padding: 8px 16px;
    background-color: transparent;
    border: 1px solid #C70000;
    color: #C70000;
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s, border-color 0.3s;

    &:hover {
        color: #fff; 
        background-color: #C70000; 
        border-color: transparent; 
    }
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Line = styled.div<isEditProps>`
    margin: 20px 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.edit === true ? '#468bcf;' : 'rgb(81, 184, 83)'};
`;

const Label = styled.label`
    margin-top: 20px;
    margin-bottom: 4px;
    font-family: inherit;
    font-weight: 400;
`;

const BoldLabel = styled(Label)`
  font-weight: 600;
`;

const Input = styled.input<isEditProps>`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  transition: border-color 0.3s ease; 

  &:focus {
    border-color: ${props => props.edit === true ? '#468bcf;' : 'rgb(81, 184, 83)'}; 
    outline: none; 
  }
`;

const KeywordList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const KeywordItem = styled.li`
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
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

const PlusButton = styled.button<isEditProps>`
  background-color: ${props => props.edit === true ? '#468bcf;' : 'rgb(81, 184, 83)'};
  border: none; 
  border-radius: 25px;
  cursor: pointer;
  padding: 8px;
  align-items: center;
  justify-content: center;
  display: flex;
  svg {
    height: 14px;
    width: 14px;
  }
  transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.edit ? '#3a7aa6' : '#4c9d4c'};
    }
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none; 
  border-radius: 25px;
  cursor: pointer;
  padding: 8px;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); 
  }

  svg {
    height: 24px;
    width: 24px;
  }
`;

const PalavrasChavesInputButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface CadastroModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditModal: boolean;
  editInfo: ProposicaoCardInfo;
  att: boolean;
  setAtt: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  nome: string;
  url: string;
  tipo: string;
  numero: string;
  ano: string;
  palavrasChave: string[];
  id: string;
}

const initialFormData: FormData = {
  nome: '',
  url: '',
  tipo: '',
  numero: '',
  ano: '',
  palavrasChave: [],
  id: ''
};

// Para styled components
interface isEditProps {
  edit: boolean;
}

export function CadastroModal(props: CadastroModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [newKeyword, setNewKeyword] = useState<string>('');
  const placeholder = formData.tipo && formData.numero && formData.ano ? `${formData.tipo} ${formData.numero}/${formData.ano}` : '';



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === 'numero') {
      // Remover todos os caracteres que não são dígitos
      sanitizedValue = value.replace(/\D/g, '');
    } else if (name === 'ano') {
      // Permitir apenas dígitos e no máximo 4 caracteres
      sanitizedValue = value.replace(/\D/g, '');
      sanitizedValue = sanitizedValue.slice(0, 4);
    } else if (name === 'tipo') {
      // Converter para letras maiúsculas (CAPS LOCK)
      sanitizedValue = value.toUpperCase();
      // Remover caracteres que não são letras
      sanitizedValue = sanitizedValue.replace(/[^A-Z]/g, '');
    }

    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleAddKeyword = (): void => {
    if (newKeyword.trim() !== '') {
      setFormData({ ...formData, palavrasChave: [...formData.palavrasChave, newKeyword] });
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (index: number): void => {
    const updatedKeywords = [...formData.palavrasChave];
    updatedKeywords.splice(index, 1);
    setFormData({ ...formData, palavrasChave: updatedKeywords });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditModal) {
      try {
        const anoNumber = parseInt(formData.ano);
        const numeroNumber = parseInt(formData.numero);
        const idNumber = parseInt(formData.id);
        
        const requestBody = { ...formData, id: idNumber, ano: anoNumber, numero: numeroNumber };
        if (requestBody.nome === '') {
          requestBody.nome = `${formData.tipo} ${formData.numero}/${formData.ano}`;
        }
        
        const response = await fetch(`http://localhost:3333/proposicoes/${idNumber}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          console.log('Proposição alterada com sucesso');
        } else {
          console.error('Falha ao atualizar os dados:', response.status);
        }
      } catch (error) {
        console.error('Ocorreu um erro ao processar a requisição:', error);
      }


    } else {
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaTipo=${formData.tipo}&numero=${formData.numero}&ano=${formData.ano}`);
        const data = await response.json();

        if (data.dados && data.dados.length > 0) {
          // Extrair o ID da proposição encontrada
          const idProposicao = data.dados[0].id;
         
          const anoNumber = parseInt(formData.ano);
          const numeroNumber = parseInt(formData.numero);
        
          const requestBody = { ...formData, id: idProposicao, ano: anoNumber, numero: numeroNumber };
          if (requestBody.nome === '') {
            requestBody.nome = `${formData.tipo} ${formData.numero}/${formData.ano}`;
          }

          // Salvar na nossa api
          const response = await fetch('http://localhost:3333/proposicao', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });

          if (response.ok) {
            console.log('Proposição criada com sucesso.');
          } else {
            console.error('Erro ao salvar os dados:', response.status);
          }
        } else {
          console.error('Nenhuma proposição encontrada.');
        }
      } catch (error) {
        console.error('Ocorreu um erro ao processar a solicitação:', error);
      }
    }

    closeModal();
  };


  ////////////////


  const { isModalOpen, setIsModalOpen, isEditModal, editInfo, att, setAtt } = props;

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData(initialFormData);
    setAtt(prev => !prev)
  };

  useEffect(() => {
    if (isEditModal) {
      const { nome, url, tipo, numero, ano, palavrasChave, id } = editInfo;
      const formDataEditInfo = {
        nome,
        url,
        tipo,
        numero: numero.toString(), 
        ano: ano.toString(), 
        palavrasChave,
        id: id.toString()
      };
      setFormData(formDataEditInfo);
    } else {
      setFormData(initialFormData);
    }
  }, [isModalOpen])


  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      
      const idNumber = parseInt(formData.id);
     
     
     
      const response = await fetch(`http://localhost:3333/proposicoes/${idNumber}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Proposição deletada com sucesso');
      } else {
        console.error('Falha ao deletar a proposição', response.status);
      }
    } catch (error) {
      console.error('Ocorreu um erro ao processar a requisição:', error);
    }

    closeModal();

  }



  return (
    <>
      {isModalOpen && (
        <ModalBackground>
          <ModalContent className='cadastro-modal-content'>

            <TitleContainer>
              {isEditModal ? <Title>Editar Proposição</Title> : <Title>Nova Proposição</Title>}
              <CloseButton onClick={() => { closeModal(); }}><CloseIcon /></CloseButton>
            </TitleContainer>
            <Form onSubmit={handleSubmit}>

              <BoldLabel htmlFor="tipo">Tipo:</BoldLabel>
              <Input edit={isEditModal} type="text" id="tipo" name="tipo" value={formData.tipo} onChange={handleInputChange} />

              <BoldLabel htmlFor="numero">Número:</BoldLabel>
              <Input edit={isEditModal} type="text" id="numero" name="numero" value={formData.numero} onChange={handleInputChange} />

              <BoldLabel htmlFor="ano">Ano:</BoldLabel>
              <Input edit={isEditModal} type="text" id="ano" name="ano" value={formData.ano} onChange={handleInputChange} />

              <Line edit={isEditModal}></Line>

              <Label htmlFor="nome">Nome:</Label>
              <Input edit={isEditModal} type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} placeholder={placeholder} />

              <Label htmlFor="url">URL:</Label>
              <Input edit={isEditModal} type="text" id="url" name="url" value={formData.url} onChange={handleInputChange} />



              {/* <Line></Line> */}


              <Label htmlFor="palavras-chave">Palavras-chave:</Label>
              <PalavrasChavesInputButtonContainer>
                <Input edit={isEditModal}
                  type="text"
                  id="palavras-chave"
                  name="palavrasChave"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                />
                <PlusButton type="button" onClick={handleAddKeyword} edit={isEditModal}>
                  <WhitePlusIcon />
                </PlusButton>
              </PalavrasChavesInputButtonContainer>

              <KeywordList>
                {formData.palavrasChave.map((keyword, index) => (
                  <KeywordItem key={index}>
                    {keyword}
                    <button type="button" onClick={() => handleRemoveKeyword(index)}><CloseIcon /></button>
                  </KeywordItem>
                ))}
              </KeywordList>

              <Button type="submit" edit={isEditModal}>{isEditModal ? "Salvar mudanças" : "Adicionar"}</Button>
              {isEditModal && <DeleteButton onClick={handleDelete}>Excluir proposição</DeleteButton>}
            </Form>




          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
}


