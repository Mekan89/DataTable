import React, { useState } from "react";
import people from "./people.json";
import { BsSearch, BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td, Text, Input, InputGroup, InputLeftElement, Box } from "@chakra-ui/react";
import { Checkbox, Stack, Flex, Icon } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import useSortableData from "./useSortableData";

function App() {
  const data = people;
  // let config = {key:'id', direction: 'asc' }
  const [q, setQ] = useState("");
  const [searchColumn, setSearchColumn] = useState(["first_name", "last_name"]);
  const { items, requestSort, sortArrow, sortConfig } = useSortableData(data);
  const [arrow, setArrow] = useState("")

  const headers = Object.keys(data[0]).splice(0, 4);

  const search = rows => {
    return rows.filter(row =>
      searchColumn.some(column => row[column].toString().toLowerCase().includes(q.toLowerCase()))
    );
  };

  const searchHandler = e => {
    const { value } = e.target;
    const inState = [...searchColumn];
    const foundItem = inState.indexOf(value);

    if (foundItem < 0) {
      inState.push(value);
    } else {
      inState.splice(foundItem, 1);
    }

    setSearchColumn(inState);
  };

  const handleSort = (item) => {
    requestSort(headers.filter(el => el === item).toString())
  }

  return (
    <Box w="100%">
      <Box textAlign="center" p="3" bg="gray" color="white">
        <Text fontSize="3xl" p="3">
          Data Filter & Sort
        </Text>
      </Box>
      <Box>
        <InputGroup>
          <InputLeftElement children={<Icon as={BsSearch} />} />
          <Input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
        </InputGroup>
      </Box>
      <Flex p="3">
        <Stack spacing={10} direction="row">
          {headers.map(item => (
            <Checkbox key={uuidv4()} value={item} isChecked={searchColumn.includes(item)} onChange={searchHandler}>
              {item}
            </Checkbox>
          ))}
        </Stack>
      </Flex>

      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              {headers.map(item => (
                <Th
                  key={uuidv4()}
                  onClick={() => handleSort(item)}
                  p="1"
                  w="25%">
                  {item}  {item === Object.values(sortConfig)[0] && <Icon as={sortArrow(item) ==='asc' ? BsArrowUpShort : BsArrowDownShort} 
                  w={5} h={5} color="red.500"/> }
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {search(items).map(row => (
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
