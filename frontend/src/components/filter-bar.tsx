"use client"

import styled from "styled-components"
import { PlusIcon } from "./icons/plus-icon";
import { SearchIcon } from "./icons/search-icon";


const FilterBarContainer = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #D9D9D9;
    justify-content: space-between;
    align-items: center;
    padding: 14px;

    

    h1 {
        font-weight: 500;
        font-size: 16px
    }
    
`;



const Select = styled.select`
    padding: 12px;
    border: none;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    font-size: 16px;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        outline: none;
    }

    &::placeholder {
        color: #999;
    }

   
    option {
        padding: 10px;
        background-color: #fff;
    }

   
    option:hover {
        background-color: #f0f0f0;
    }
`;

const TipoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;

const AddButton = styled.button`
    gap: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: rgb(81, 184, 83);
    padding: 4px 6px;
    border-radius: 8px;
    font-family: inherit;
    cursor: pointer;
    h3 {
        font-family: inherit;
        font-size: 16px;
        color: white;
        font-weight: 500;
        padding: 0px 7px 0px 0px;
      }

      transition: background-color 0.3s;

    &:hover {
        background-color: #4c9d4c;
    }

`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: inherit;
  font-size: 16px; 
  width: 430px; 
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      outline: none;
  }
`;


interface FilterBarProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    year: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
    years: number[];
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    types: string[];
}

export function FilterBar(props: FilterBarProps) {
    const { setIsModalOpen, setIsEditModal, search, setSearch } = props;

    const toggleModal = () => {
        setIsEditModal(false);
        setIsModalOpen(true);
    };
    const options = props.types;

    const years = props.years;


    return (
        <FilterBarContainer>

            <SelectContainer>
                <TipoContainer>
                    <h1>TIPO:</h1>
                    <Select value={props.type} onChange={(event) => props.setType(event.target.value)}>
                        <option value="">Todos</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </Select>
                </TipoContainer>

                <TipoContainer>
                    <h1>ANO:</h1>
                    <Select value={props.year.toString()} onChange={(event) => props.setYear(parseInt(event.target.value))}>
                        <option value="">Todos</option>
                        {years.map(year => (
                            <option key={year} value={year.toString()}>{year}</option>
                        ))}
                    </Select>
                </TipoContainer>

                <TipoContainer>
                    <SearchIcon />
                    <Input value={search} onChange={(event) => setSearch(event.target.value)}></Input>
                </TipoContainer>

            </SelectContainer>


            <AddButton onClick={() => { toggleModal() }}>
                <PlusIcon />
                <h3>Adicionar</h3>
            </AddButton>





        </FilterBarContainer>
    )

}