import React, { useState } from "react";
import people from "./people.json";
import { BsSearch } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td, Text, Input, InputGroup, InputLeftElement, Box } from "@chakra-ui/react";
import { Checkbox, Stack } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const data = people;
  const [q, setQ] = useState("");
  const [searchColumn, setSearchColumn] = useState(["first_name", "last_name"]);

  const headers = Object.keys(data[0]).splice(0, 4);

  const search = rows => {
    return rows.filter(row =>
      searchColumn.some(column => row[column].toString().toLowerCase().includes(q.toLowerCase()))
    );
  };

const searchHandler = (e) => {
  const {value} = e.target;
  const inState = [...searchColumn];
  const foundItem = inState.indexOf(value);

  if(foundItem < 0) {
    inState.push(value)
  } else {
    inState.splice(foundItem, 1)
  }

  setSearchColumn(inState)
}

  return (
    <Box>
      <Box textAlign="center" p="3" bg="gray" color="white">
        <Text fontSize="3xl" p="3">
          Data Filter & Sort
        </Text>
      </Box>
      <Box>
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
        </InputGroup>
      </Box>
      <Box p='3'>
        <Stack spacing={10} direction="row">
          {headers.map(item => (
            <Checkbox key={uuidv4()} value={item} isChecked={searchColumn.includes(item)} onChange={searchHandler}>{item}</Checkbox>
          ))}
        </Stack>
      </Box>

      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              {headers.map(item => (
                <Th key={uuidv4()}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {search(data).map(row => (
              <Tr key={uuidv4()}>
                {headers.map(column => (
                  <Td key={uuidv4()}>{row[column]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default App;
